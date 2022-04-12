// quay màn hình
let completeBlob = null;
let recorder = null;
let chunks = [];
let stream = null;
let floatGif = "";
let alignGif = "";
let marginGif = "";
var data_effect = [];
var data_icon = [];
var data_frames = [];
let list_check_icon = 0;
let list_check_effect = 0;
let list_check_frames = 0;

// git effect
let click_git_effect_1 = false;

// git icon
let click_git_icon_1 = false;
let click_git_icon_2 = false;
let click_git_icon_3 = false;

// git frames
let click_git_frames_1 = false;

let videoResult = document.getElementById("videoResult");
async function startRecord() {
  try {
    stream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        mediaSource: "screen",
      },
    });
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => {
      chunks.push(e.data), chunks.push(e.data);
    };
    recorder.start();
    recorder.onstop = onstop;
    document.getElementById("startBtn").style.display = "unset";
    document.getElementById("stopBtn").style.display = "unset";
  } catch (error) {
    window.alert(error);
  }
}
async function stopScreen() {
  recorder.stop();
  document.getElementById("stopBtn").style.display = "none";
  stream.getTracks().forEach(function (track) {
    track.stop();
  });
}
function onstop() {
  completeBlob = new Blob(chunks, {
    type: chunks[0].type,
  });
  let downloadButton = document.getElementById("downloadbtn");
  let video = document.getElementById("videoResult");
  video.style.display = "block";
  video.src = URL.createObjectURL(completeBlob);
  downloadButton.style.display = "unset";
  downloadButton.href = URL.createObjectURL(completeBlob);
  downloadButton.download = Date.now() + ".mp4";
}
// quay video bằng camera
let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let start_button = document.querySelector("#start-record");
let stop_button = document.querySelector("#stop-record");
let download_link = document.querySelector("#download-video");

let camera_stream = null;
let media_recorder = null;
let blobs_recorded = [];

camera_button.addEventListener("click", async function () {
  camera_stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  video.srcObject = camera_stream;
});

start_button.addEventListener("click", function () {
  // set MIME type of recording as video/webm
  media_recorder = new MediaRecorder(camera_stream, { mimeType: "video/webm" });

  // event : new recorded video blob available
  media_recorder.addEventListener("dataavailable", function (e) {
    blobs_recorded.push(e.data);
  });

  // event : recording stopped & all blobs sent
  media_recorder.addEventListener("stop", function () {
    // create local object URL from the recorded video blobs
    let video_local = URL.createObjectURL(
      new Blob(blobs_recorded, { type: "video/webm" })
    );
    videoResult.style.display = "block";
    videoResult.src = video_local;
    download_link.href = video_local;
  });

  // start recording with each recorded blob having 1 second video
  media_recorder.start(1000);
});

stop_button.addEventListener("click", function () {
  media_recorder.stop();
});
// kéo thả
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}
let modalBtn = document.getElementById("popup-btn");
let modal = document.querySelector(".popup");
let closeBtn = document.querySelector(".close-btn");
// Hiển thị popup khi nhấp chuột vào button
modalBtn.onclick = function () {
  modal.style.display = "block";
};
// Đóng popup khi ấn vào nút đóng
closeBtn.onclick = function () {
  modal.style.display = "none";
};
// Đóng khi nhấp chuột vào bất cứ khu vực nào trên màn hình
window.onclick = function (e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
};
// Thay đổi css của border khi click vào gif
function borderEffect1() {
  if (this.click_git_effect_1) {
    document.getElementById("gif_effect_1").style.borderColor = "#fafafa";
    this.click_git_effect_1 = false;
    list_check_effect--;
  } else if (checkSelectGifEffect()) {
    document.getElementById("gif_effect_1").style.borderColor =
      "rgb(31, 129, 220)";
    this.click_git_effect_1 = true;
  }
}
function borderIcon1() {
  if (this.click_git_icon_1) {
    document.getElementById("gif_icon_1").style.borderColor = "#fafafa";
    this.click_git_icon_1 = false;
    list_check_icon--;
    console.log(list_check_icon);
  } else if (checkSelectGifIcon()) {
    document.getElementById("gif_icon_1").style.borderColor =
      "rgb(31, 129, 220)";
    this.click_git_icon_1 = true;
  }
}
function borderIcon2() {
  if (this.click_git_icon_2) {
    document.getElementById("gif_icon_2").style.borderColor = "#fafafa";
    this.click_git_icon_2 = false;
    list_check_icon--;
    console.log(list_check_icon);
  } else if (checkSelectGifIcon()) {
    document.getElementById("gif_icon_2").style.borderColor =
      "rgb(31, 129, 220)";
    this.click_git_icon_2 = true;
  }
}
function borderIcon3() {
  if (this.click_git_icon_3) {
    document.getElementById("gif_icon_3").style.borderColor = "#fafafa";
    this.click_git_icon_3 = false;
    list_check_icon--;
    console.log(list_check_icon);
  } else if (checkSelectGifIcon()) {
    document.getElementById("gif_icon_3").style.borderColor =
      "rgb(31, 129, 220)";
    this.click_git_icon_3 = true;
  }
}
function borderFrames1() {
  if (this.click_git_frames_1) {
    document.getElementById("gif_frames_1").style.borderColor = "#fafafa";
    this.click_git_frames_1 = false;
    list_check_frames--;
    console.log("list check frames: ", this.list_check_frames);
  } else if (checkSelectGifFrames()) {
    document.getElementById("gif_frames_1").style.borderColor =
      "rgb(31, 129, 220)";
    this.click_git_frames_1 = true;
  }
}
// kiểm tra số lượng Gif Icon đã chọn
function checkSelectGifEffect() {
  console.log(list_check_effect);
  if (list_check_effect < 1) {
    list_check_effect++;
    return true;
  } else {
    console.log("Chỉ chọn tối đa 1 hiệu ứng gif");
    return false;
  }
}
function checkSelectGifIcon() {
  console.log(list_check_icon);
  if (list_check_icon < 2) {
    list_check_icon++;
    return true;
  } else {
    console.log("Chỉ chọn tối đa 2 biểu tượng gif");
    return false;
  }
}
function checkSelectGifFrames() {
  console.log(list_check_frames);
  if (list_check_frames < 1) {
    list_check_frames++;
    return true;
  } else {
    console.log("Chỉ chọn tối đa 1 khung gif");
    return false;
  }
}
// đếm số gif đã chọn(chẵn, lẻ)
let html = "";
function countDataIcon() {
  if (this.data_icon % 2 == 0) {
    this.alignGif = "left";
    this.floatGif = 'float: left"';
    this.marginGif = "";
  } else {
    this.alignGif = "right";
    this.floatGif = 'clear: left"';
    this.marginGif = "-";
  }
}

// thêm vào danh sách gif đã chọn
function addGifToData() {
  if (this.click_git_effect_1) {
    this.data_effect.push([(url = "../gif/la_roi.gif")]);
  }
  countDataIcon();
  if (this.click_git_icon_1) {
    this.data_icon.push([
      (url = "../gif/dwC0qv.gif"),
      (align = this.alignGif),
      (float = this.floatGif),
      (margin = this.marginGif),
    ]);
  }
  countDataIcon();
  if (this.click_git_icon_2) {
    this.data_icon.push([
      (url = "../gif/santa-and-reindeer.gif"),
      (align = this.alignGif),
      (float = this.floatGif),
      (margin = this.marginGif),
    ]);
  }
  countDataIcon();
  if (this.click_git_icon_3) {
    this.data_icon.push([
      (url = "../gif/img_logo.gif"),
      (align = this.alignGif),
      (float = this.floatGif),
      (margin = this.marginGif),
    ]);
  }
  if (this.click_git_frames_1) {
    this.data_frames.push([(url = "../gif/khung_nen_1.gif")]);
  }
}

// Làm mới danh sách Gif đã chọn
function refreshListCheckGif() {
  this.data_icon = [];
  this.data_effect = [];
  this.data_frames = [];
  this.click_git_icon_1 = false;
  this.click_git_icon_2 = false;
  this.click_git_icon_3 = false;
  this.click_git_effect_1 = false;
  this.click_git_frames_1 = false;
  list_check_effect = 0;
  list_check_icon = 0;
  list_check_frames = 0;
  document.getElementById("gif_effect_1").style.borderColor = "#fafafa";
  document.getElementById("gif_icon_1").style.borderColor = "#fafafa";
  document.getElementById("gif_icon_2").style.borderColor = "#fafafa";
  document.getElementById("gif_icon_3").style.borderColor = "#fafafa";
  document.getElementById("gif_frames_1").style.borderColor = "#fafafa";
}
// đưa gif vào thẻ
function displayGit() {
  modal.style.display = "none";
  addGifToData();
  let objHTML = document.getElementById("spaceGif");
  // Gif trở lại ban đầu
  objHTML.innerHTML =
    "<video" +
    " autoplay loop muted" +
    ' style="display: ' +
    videoResult.style.display +
    ';"' +
    ' id="videoResult"' +
    ' class="videoResult"' +
    ' src="' +
    videoResult.src +
    '"' +
    " ></video>";

  // tạo và xuất hiệu ứng
  if (data_effect) {
    for (item in data_effect) {
      var list = data_effect[item];
      console.log(item);
      console.log(data_effect);
      console.log(list[0]);
      objHTML.innerHTML =
        objHTML.innerHTML +
        '<div align="left">' +
        "<img class='gif_overlay_effect' " +
        ' src="' +
        list[0] +
        '"/>' +
        "</div>";
    }
  }

  // tạo và xuất biểu tượng
  for (item in data_icon) {
    var list = data_icon[item];
    console.log(item);
    console.log(data_icon);
    console.log(list[0]);
    objHTML.innerHTML =
      objHTML.innerHTML +
      '<div align="' +
      list[1] +
      '">' +
      '<img class="gif_overlay_icon" style="' +
      list[1] +
      ": 30px; " +
      list[2] +
      ' src="' +
      list[0] +
      '"/>' +
      "</div>";
  }

  if (data_frames) {
    for (item in data_frames) {
      var list = data_frames[item];
      console.log(item);
      console.log(data_frames);
      console.log(list[0]);
      objHTML.innerHTML =
        objHTML.innerHTML +
        '<div align="left">' +
        "<img class='gif_overlay_frames' " +
        ' src="' +
        list[0] +
        '"/>' +
        "</div>";
    }
  }

  // nội dung lời chúc
  let comment_wish = document.getElementById("holiday_greetings").value;
  if (comment_wish) {
    objHTML.innerHTML =
      objHTML.innerHTML +
      '<div align="center">' +
      '<h2 class="comment_wish"><i>' +
      comment_wish +
      "</i></h2>" +
      "</div>";
  }
  console.log(comment_wish);

  refreshListCheckGif();
}
