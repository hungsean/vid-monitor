
const realtimeToVideotime = (realtime_total_length, videotime_total_length, realtime_transform_length) =>
{
    console.log("realtime: ", realtime_total_length)
    console.log("videotime: ", videotime_total_length)
    // 計算時間比例
    const timeRatio = videotime_total_length / realtime_total_length;
    // 將實際時間轉換為影片時間
    return realtime_transform_length * timeRatio;
}

export default realtimeToVideotime;