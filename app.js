
const express = require('express');
const morgan = require('morgan');
const globalErrorHandler = require('./controllers/errorController');
const cookieParser = require('cookie-parser');
const AppError = require('./util/appError');
const userRoutes = require('./routers/userRoutes');
const postRoutes = require('./routers/postRoutes');
const {MONGOURL} = require('./config/keys');
const cors = require('cors');
const app =express();



// Body parser, reading data from body into req.body
app.use(express.json({limit: '10kb'}));
//
app.use(cors())
app.use(cookieParser());

//Middlewares.............
if(process.env.NODE_ENV === 'devlopment') {
	app.use(morgan('dev'));
}



app.use((req,res,next) => {
	console.log("hello from the middleware............................");


	next()
});

app.use((req,res,next) => {
	req.requestTime = new Date().toISOString();
		console.log(req.requestTime)

	next();
});
app.use('/users',userRoutes);
app.use('/post',postRoutes);





app.all('*',(req,res,next) => {

	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
});

app.use(globalErrorHandler);

module.exports = app;