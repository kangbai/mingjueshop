export const validPhoneNum = (num) => {
  var sMobile = num;
  if(!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(sMobile))){
    return false;
  }
  return true;
}

export const formatDate = (sec) => {
  var date = new Date(Number(sec) * 1000);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + hour;
}
