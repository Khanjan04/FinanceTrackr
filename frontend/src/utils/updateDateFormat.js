export const formatted_timedate = (timedate) => {
    if (timedate === null){
      return "Not scanned"
    }
    else{
      const final_format= new Date(timedate).toDateString() + ", " + new Date(timedate).toLocaleTimeString().toUpperCase()
      return final_format;
    }
  }