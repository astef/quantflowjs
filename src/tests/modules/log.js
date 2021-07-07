export default function Log() {}
Log.prototype.log = function (e) {
    console.log(`LOGBEGIN`);
    console.log(e);
    console.log(`LOGEND`);
};
