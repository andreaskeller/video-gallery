const YOUTUBE_HOST = "https://youtube.googleapis.com";

export async function getChannelInfo(channelId) {
  try {
    const response = await fetch(
      `${YOUTUBE_HOST}/youtube/v3/channels?part=snippet,contentDetails&id=${channelId}&key=${process.env.YOUTUBE_API_KEY}`
    );

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }

  return null;
}

export async function getAllPlaylistItems(playlistId) {
  try {
    const playlistItemsUrl = `${YOUTUBE_HOST}/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${process.env.YOUTUBE_API_KEY}`;
    let playlistItems = [];

    let response = await fetch(playlistItemsUrl);
    let data = await response.json();

    playlistItems = data.items;

    while (data.nextPageToken) {
      response = await fetch(
        `${playlistItemsUrl}&pageToken=${data.nextPageToken}`
      );

      data = await response.json();

      playlistItems = playlistItems.concat(data.items);
    }

    return playlistItems;
  } catch (err) {
    console.log(err);
  }

  return null;
}
