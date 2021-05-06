import App from "./core/app.js";
import Md from "./model/model.js";
import Db from "./db/db.js";
import Gw from "./gw/gw.js";
import Ui from "./ui/ui.js";

const app = new App({ modules: [Gw, Db, Ui, Md] });

app.init("gw1", "Gw", {});
app.init("db1", "Db", {});
