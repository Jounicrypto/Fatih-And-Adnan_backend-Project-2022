// const feed = require('../models/feed');
const { redirect } = require('express/lib/response');
const { required } = require('nodemon/lib/config');
const feed = require('../models/feed');
const feedModel = require('../models/feed');
const user = require('../models/user');
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const req = require('express/lib/request');
const userQuestion =require('../models/question');
const comment =require('../models/comment');


const isAuth = (req,res, next)=>{
    if (req.session.username){
        next()
    }else{
        res.redirect('/')
    }
}

const userLoggedin = (req,res, next)=>{
    if (req.session.username){
        res.redirect('/posts')
        next()
    }else{
        next();
    }
}

const getLogIn = (req,res)=>{
    res.render('login',{ err : '' })
}

const getRegister = (req,res)=>{
    res.render('register',{ err : ''})
}

const postLogIn = async (req,res)=>{
    const user = await userModel.findOne( {email: req.body.email} );
    if (!user){
        res.render('login',{err: 'User not found. Register first please!'})

    }else{
        const matchedPassword = await bcrypt.compare(req.body.password, user.password)
        
        if(!matchedPassword){
            res.render('login',{err: 'password not matched. Register first please!'})
        }else{
            req.session.username = user.email;
            res.redirect('/posts');
        }
    }
    
}

const postRegister = async (req, res) => {
    const { username, email, password } = req.body;

    if( username == '' || email == '' || password == '' ){
        res.render('register', { err : "All fields are required "})
    } else {
        const currentUser = await userModel.findOne( { email: req.body.email } );

        if(currentUser){
            res.render('register', { err: "email address is already exist "})
        } else {
            console.log(req.body)
            const bcryptPass = await bcrypt.hash(req.body.password, 10)
            let theUser = {
                username: req.body.username,
                email: req.body.email,
                password: bcryptPass
            };
            const newUser = new userModel(theUser);
            newUser.save()
                .then( () => {
                    res.redirect('/login')
                })
                .catch( err => {
                    console.log(err);
                })
        }
    }
}
    
    

const logOut = (req,res)=>{
    req.session.destroy(err =>{
        if (err) throw err;
        res.redirect('/login')
    });
    
}

function getHomePage(req, res) {
    const allMessages = feedModel.find()
        .then(allMessages => {
            res.render('homePage', { pageTitle: 'Home Page', articles: allMessages, user: req.session.username });
        })
        .catch(err => {
            console.log(err);
        });

}

const getNewArticle = (req, res) => {
    res.render('addNewArticle', {pageTitle: 'New Message'});
}

const postMedia = (req, res) => {
    
    const newFeed = feedModel(req.body)
    newFeed.save()
    .then(()=>{
        res.redirect('/posts');
    })
    .catch(err=>{
        console.log(err)
    })

}

const delComment = (req,res) =>{
    
    feedModel.findOneAndDelete(req.params.id)
    .then(()=>{
    res.redirect('/posts');
    })
    .catch(err=>{
    console.log(err)
    })
}

const getEditMessage = (req,res)=>{
    feedModel.findOne({_id: req.params.id})
    .then(feed =>{
        res.render('editMessage',{messageEdit: 'edit Message', article:feed} )
    })
    .catch(err=>{
        console.log(err)
    })
    
    
}

const postEditMessage =(req,res)=>{
    feedModel.findOneAndUpdate(req.params.id,req.body)
    .then( ()=>{
        res.redirect('/posts');
    })
    .catch(err =>{
        console.log(err)
    })
}



const getQuestionsPage =(req,res)=>{
    res.render('questions', {pageTitle: 'Questions'});
}
//--------------------------------------------------------------------------------

// const getHomePage = (req,res) => {
//     Feed.find()
//     .then(feeds =>{
//         res.render('homePage' , {pageTitle:'Home Page' , feeds})
//     })
//     .catch(err => console.log(err))
    
//     }

const getQuestion =(req,res) =>{

    const questions = userQuestion.find()
    .then(questions =>{
        res.render('postQuestion' ,{pageTitle:'Question Page' ,questions:questions})
    })
    .catch(err=>{
        console.log(err)
    })
    
}


const questions =(req,res) => {

   
    if (req.method=='GET') {

        res.render('questions' , {pageTitle:'Post question'})
    }

    if (req.method=='POST') {
        const newQuestion = userQuestion(req.body)
        newQuestion.save()
        .then(() =>{
            console.log(newQuestion);
            res.redirect('/homeQuestions');
        })
        .catch(err=>{
            console.log(err)
        })
        
    }
    
    }


    const showQuestion = (req,res) =>{
       
        userQuestion.findById(req.params.id)
        .then(question => {
            res.render('showQuestionPage' , {pageTitle: 'Question Page' ,question })
        })

       
    }

    const delQuestion =(req,res) =>{
        userQuestion.findByIdAndDelete(req.params.id)
        .then(result =>
            res.redirect('/homeQuestions'))
        .catch(err => console.log(err))
    }

    const updateQuestion =(req,res) => {
        if (req.method==='GET') {
            userQuestion.findById(req.params.id)
            .then(question=> {
                res.render('updateQuestion' ,{pageTitle:'Update question' ,question})
            })
            .catch(err => console.log(err))
        }
    
        
        if (req.method==='POST') {
            userQuestion.findByIdAndUpdate(req.params.id,req.body)
            .then(result=>{
                  res.redirect('/homeQuestions')
            })
            .catch(err =>console.log(err))
            
        }
    
    }

    const getComment =(req,res) =>{

        const comments = comment.find()
        .then(comments  =>{
            console.log(comments);
            res.render('showQuestionPage' ,{pageTitle:'Comment Page' , comments});
        })
        .catch(err=>{
            console.log(err)
        })
        
    }


    const commentQuestion =(req,res) => {
    // const question =userQuestion.find();

        if (req.method=='GET') {

            res.render('showQuestionPage' , {pageTitle:'comment' })
        }
    
        if (req.method=='POST') {
            const comment = comment(req.body);
            console.log(comment);
            comment.save()
            .then(() =>{
                console.log(comment);
                res.redirect('/cmt');
            })
            .catch(err=>{
                console.log(err)
            })
            
        }
    }
    

    



module.exports = {
    getHomePage,
    getNewArticle,
    postMedia,
    delComment,
    getEditMessage,
    postEditMessage,
    getLogIn,
    getRegister,
    postRegister,
    postLogIn,
    logOut,
    isAuth,
    userLoggedin,
    getQuestionsPage ,
    
    getQuestion,
    questions,
    showQuestion,
    delQuestion,
    updateQuestion,
    commentQuestion,
    getComment,

}