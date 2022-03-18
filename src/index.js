const exp = require('constants')
const express = require('express')
const app = express()
const { engine } = require ('express-handlebars')
const port = 3000
const morgan = require('morgan')
const path = require('path')
const methodOverride = require('method-override')

const SortMiddleWare = require('./app/middleware/SortMiddleware')

const route = require('./routes/index')
const db = require('./config/db/index')

app.use(express.static(path.join(__dirname,'public')))
//connect db
db.connect()

//post parse data
app.use(express.urlencoded({
  extended:true
}))
app.use(express.json())

//override header request
app.use(methodOverride('_method'))

//custom middleware
app.use(SortMiddleWare)

//http logger 
// app.use(morgan('combined'))

//Template engine
app.engine('.hbs', engine({
  extname: '.hbs',
  helpers: ({
    sum: (a,b) => a+b,
    sortable: (fieldname, sort) =>{
      const sortType = fieldname === sort.column ? sort.type : 'default'
      const icons = {
        default : 'fas fa-sort',
        desc : 'fas fa-sort-amount-down',
        asc : 'fas fa-sort-amount-up'
      }
      const types = {
        default : 'desc',
        asc:'desc',
        desc:'asc'
      }
      const icon = icons[sortType]
      const type = types[sortType]
      return `<a href="?_sort&column=${fieldname}&type=${type}"><i class="${icon}"></i></a>`
    }
  })
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

route(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})