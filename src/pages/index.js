// Step 1: Import React
import Layout from '../components/layout.js'
import React, { useState, useEffect } from "react"
import Header from '../components/Header.js'

// Step 2: Define your component
const IndexPage = () => {
  const getBaseBackendURL = () => {
    switch (window.location.origin) {
     case "https://memeql.com":
       console.log("Running in the production environment")
       return ("https://backend.prod.memeql.konthecat.com/")
     case "https://memeql.konthecat.com":
       console.log("Running in the production environment")
       return ("https://backend.prod.memeql.konthecat.com/")
     case "https://dev.memeql.com":
       console.log("Running in the development environment")
       return ("https://backend.dev.memeql.konthecat.com/")
     case "https://dev.memeql.konthecat.com":
       console.log("Running in the development environment")
       return ("https://backend.dev.memeql.konthecat.com/")
     default: 
       console.log("Running in the local environment")
       return("http://localhost:4000/")
    }
}

const baseBackendURL = getBaseBackendURL()

const [userData, setUserData] = useState(null)
const loginUser = async (loginData) => {
 const request = await fetch (`${baseBackendURL}auth/login`, {
     method: "POST",
     credentials: 'include',
     headers: {
         "Content-Type": "application/json"
     },
     body: JSON.stringify(loginData),
 })
 const requestData = await request.json()
 console.log(requestData)
 if (requestData.message === "Login successful") {
   setUserData(requestData)
 } else {
   setUserData(null)
 } 
}

const logoutUser = async () => {
 const URL = `${baseBackendURL}auth/logout`
 await fetch(URL, {
     method: "POST",
     credentials: 'include'
 })
 setUserData(null)
}

const getCurrentUserData = async () => {
 const request = await fetch (`${baseBackendURL}auth/`, {
   method: "GET",
   credentials: 'include',
})
const requestData = await request.json()
if (requestData.message === "Returning user data") {
 setUserData(requestData)
} else {
 setUserData(null)
}
}

useEffect(() => {
 getCurrentUserData()
}, [])

  const [starsCount, setStarsCount] = useState(0)
  useEffect(() => {
    // get data from GitHub api
    fetch(`https://api.github.com/repos/KonTheCat/AzureBootUP`)
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        setStarsCount(resultData.stargazers_count)
      }) // set data for the number of stars
  }, [])

  return (
    <Layout pageTitle="Home Page">
      <Header baseBackendURL = {baseBackendURL} loginUser = {loginUser} logoutUser = {logoutUser} userData = {userData}/>
    </Layout>
  )
}

// You'll learn about this in the next task, just copy it for now
export const Head = () => <title>Home Page</title>

// Step 3: Export your component
export default IndexPage