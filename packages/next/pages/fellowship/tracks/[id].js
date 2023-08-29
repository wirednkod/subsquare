import { withLoginUser, withLoginUserRedux } from "next-common/lib";
import { ssrNextApi } from "next-common/services/nextApi";
import {
  fellowshipTracksApi,
  fellowshipReferendumsTrackApi,
  fellowshipReferendumsTracksApi,
  fellowshipReferendumsTracksSummaryApi,
  gov2TracksApi,
} from "next-common/services/url";
import { EmptyList } from "next-common/utils/constants";
import startCase from "lodash.startcase";
import { to404 } from "next-common/utils/serverSideUtil";
import ListLayout from "next-common/components/layout/ListLayout";
import normalizeFellowshipReferendaListItem from "next-common/utils/gov2/list/normalizeFellowshipReferendaListItem";
import PostList from "next-common/components/postList";
import businessCategory from "next-common/utils/consts/business/category";
import Gov2TrackSummary from "next-common/components/summary/gov2TrackSummary";

export default withLoginUserRedux(
  ({ posts, title, fellowshipTracks, summary, period }) => {
    const seoInfo = { title, desc: title };
    const items = (posts.items || []).map((item) =>
      normalizeFellowshipReferendaListItem(item, fellowshipTracks),
    );

    return (
      <ListLayout
        seoInfo={seoInfo}
        title={`[${period.id}] Origin: ${period.origin}`}
        description={period.description}
        summary={
          <Gov2TrackSummary
            summary={summary}
            period={period}
            titleExtra={`[${period.id}]`}
          />
        }
      >
        <PostList
          title="List"
          titleCount={posts.total}
          category={businessCategory.fellowship}
          items={items}
          pagination={{
            page: posts.page,
            pageSize: posts.pageSize,
            total: posts.total,
          }}
        />
      </ListLayout>
    );
  },
);

export const getServerSideProps = withLoginUser(async (context) => {
  const { page = 1, page_size: pageSize = 50, id } = context.query;

  const [{ result: tracks = [] }, { result: fellowshipTracks = [] }] =
    await Promise.all([
      ssrNextApi.fetch(gov2TracksApi),
      ssrNextApi.fetch(fellowshipTracksApi),
    ]);

  let track = fellowshipTracks.find(
    (trackItem) => trackItem.id === parseInt(id),
  );
  if (!track) {
    track = fellowshipTracks.find((item) => item.name === id);
  }
  if (!track) {
    return to404();
  }

  const [{ result: posts }, { result: summary }, { result: period }] =
    await Promise.all([
      ssrNextApi.fetch(fellowshipReferendumsTrackApi(track?.id), {
        page,
        pageSize,
      }),
      ssrNextApi.fetch(fellowshipReferendumsTracksSummaryApi(track?.id)),
      ssrNextApi.fetch(fellowshipReferendumsTracksApi(track?.id)),
    ]);

  return {
    props: {
      posts: posts ?? EmptyList,
      title: "Fellowship " + startCase(track.name),
      tracks: tracks ?? [],
      fellowshipTracks: fellowshipTracks ?? [],
      summary: summary ?? {},
      period: period ?? {},
    },
  };
});