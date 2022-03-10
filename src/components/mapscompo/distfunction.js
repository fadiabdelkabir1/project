function calcDist(arg1, arg2, radious){
    //input check
        if(arg1 == undefined || arg1 == null  || arg1 === "")  throw new RangeError("arg1 is null or undefined!");
        if(arg2 == undefined || arg2 == null  || arg2 === "")  throw new RangeError("arg2 is null or undefined!");
        if(radious == undefined || radious == null || radious === "" || radious <= 0)  throw new RangeError("radious is invalid (greater than 0 ) or null or undefined!");
        if(arg1.lat == undefined || arg1.lat == null || arg1.lat === "")  throw new RangeError("lattitude in arg1 is null or undefined!");
        if(arg1.lng == undefined || arg1.lng == null || arg1.lng === "")  throw new RangeError("longitude in arg1 is null or undefined!");
        if(arg2.lat == undefined || arg2.lat == null || arg2.lat === "")  throw new RangeError("lattitude in arg1 is null or undefined!");
        if(arg2.lng == undefined || arg2.lng == null || arg2.lng === "")  throw new RangeError("longitude in arg1 is null or undefined!");
    
      const EARTH_RADIOUS = 6371;
      const D_LAT = (arg2.lat-arg1.lat) * Math.PI / 180;
      const D_LON = (arg2.lng-arg1.lng) * Math.PI / 180;
      const TEMPO_LAT1 = arg1.lat * Math.PI / 180;
      const TEMPO_LAT2 = arg2.lat * Math.PI / 180;
      const AREA = Math.sin(D_LAT/2) * Math.sin(D_LAT/2) + Math.sin(D_LON/2) * Math.sin(D_LON/2) * Math.cos(TEMPO_LAT1) * Math.cos(TEMPO_LAT2);
      const CIRCUM = 2 * Math.atan2(Math.sqrt(AREA), Math.sqrt(1-AREA));
    
      const DISTANCE = EARTH_RADIOUS * CIRCUM;
      return {distance : Math.ceil(DISTANCE*1000), isInRadious: Math.ceil(DISTANCE*1000) <= radious };
    }

export default calcDist