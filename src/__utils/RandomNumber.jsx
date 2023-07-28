const RandomNumber = () => {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let day = now.getDate();
    let hour = now.getHours();
    // let minute = now.getMinutes();
    // let second = now.getSeconds();
    let random = Math.floor((Math.random() * 1000) + 1);
    let final = year + '' + month + '' + day + '' + hour + '' + random;
    return final;
  }

export default RandomNumber