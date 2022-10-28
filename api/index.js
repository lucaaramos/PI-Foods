//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {Diet} = require('./src/db')

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); 
  });
});

const Diets = [   'gluten free',   'ketogenic',   'vegetarian',   'lacto ovo vegetarian',   'vegan',   'pescatarian',   'paleolithic',   'primal',   'whole 30',   'fodmap friendly',   'dairy free',   ]

function preLoad(e) {
  if(!e.lenght){
    Diets.forEach(async(dieta) => {
      await Diet.create({
        name: dieta
      }) 
    })
  }
}

Diet.findAll()
.then(e => preLoad(e))