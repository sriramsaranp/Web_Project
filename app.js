const express=require('express')
const request=require('request')

const app=express()

//Middlewares
app.set("view engine","ejs")

app.get('/',(req,res)=>{
    //res.send('Home Page')
    res.render("home")
})

app.get('/result',(req,res)=>{
    //res.send(`You searched for the movie ${req.query.movieName}`)
    const url = `http://www.omdbapi.com/?apikey=113970e7&s=${req.query.movieName}`
    request(url, function(error,response,body){
        if(!error && response.statusCode===200) {
            const data = JSON.parse(body)
            //res.send(data);
            res.render('result',{moviesDump: data})
        }
        else{
            res.send('Something went wrong')

        }
    })
})
app.get('/result/:id',(req,res)=>{
    //res.send(`Roll Number of the student is ${req.params.id}`)
    const url = `http://www.omdbapi.com/?apikey=113970e7&i=${req.params.id}`
    request(url, function(error,response,body){
        if(!error && response.statusCode===200) {
            const data = JSON.parse(body)
            //res.send(data);
            res.render('details',{data: data})
        }
        else{
            res.send('Something went wrong')

        }
    })
})

app.get('*',(req,res)=>{
    res.send('404 not found')
})
app.listen(3000,()=>{
    console.log('Server has Started')
})