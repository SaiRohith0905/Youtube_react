export const YOUTUBE_KEY = "AIzaSyCatbOk8xPIpXFCbTionJF2kyzgZ7bC4lg";

export const YOUTUBE_VIDEOS_URL =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=24&regionCode=IN&key=" +
  YOUTUBE_KEY;

export const SEARCH_SUGGESTIONS_URL =
  "https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

export const SEARCH_RESULTS_URL =
  "https://www.googleapis.com/youtube/v3/search?key=" + YOUTUBE_KEY + "&q=";

export const VIDEO_DETAILS_URL =
  "https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=";

export const SINGLE_VIDEO_DETAILS =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key=" +
  YOUTUBE_KEY +
  "&id=";

export const IS_SUBSCRIBED_URL =
  "https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&forChannelId=";
// --header 'Authorization: Bearer [YOUR_ACCESS_TOKEN]' \
// --header 'Accept: application/json' \
// --compressed

export const PLAYLIST_URL =
  "https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&maxResults=25&mine=true&key=" +
  YOUTUBE_KEY;

export const PLAYLISTVIDEOS_URL =
  "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=";

export const ADD_VEDIO_TO_PLAYLIST_URL =
  "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&key=" +
  YOUTUBE_KEY;

export const DEL_VIDEO_FROM_PLAYLIST_URL =
  "https://youtube.googleapis.com/youtube/v3/playlistItems?id=";

export const UNSUBSCRIBE_TO_CHANNEL_URL =
  "https://youtube.googleapis.com/youtube/v3/subscriptions?id=";

export const SUBSCRIBE_TO_CHANNEL_URL =
  "https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&key=";

export const CREATE_NEWPLAYLIST_URL =
  "https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2Cstatus&key=";

export const GET_MY_SUBSCRIPTIONS_URL =
  "https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&maxResults=25&mine=true&key=";

export const selectPrivacy = [
  {
    privacy: "Private",
  },
  {
    privacy: "Public",
  },
];
