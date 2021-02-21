import routes from "../routes";
import Video from "../models/Video";

//javascript는 기다리지 않는다 허나 anync는 기달리게한다
export const home = async(req, res) => {
  //데이터베이스에 에러도 지나치기에 try로 에러를 잡는다
  try{
      //데이터베이스에 있는 모든 자료를 가져올때까지 기달린다
    const videos = await Video.find({});
    res.render("home", { pageTitle: "Home", videos });
  }catch(error){
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async(req, res) =>{
  const { 
    body:{title, description},
    file:{path}
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description
  });
  console.log(newVideo);
  res.render(routes.videoDetail(newVideo.id));
  // 할 일:비디오 업로드 및 저장
  //res.redirect(routes.videoDetail(324393));
};
export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "Video Detail" });

export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });

export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });