import Head from 'next/head'
import { Component } from 'react'
import Nav from './nav'
import fetch from 'isomorphic-unfetch'
import axios from 'axios';

class Favo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            submitting: false,
            submitted: false,
            items: []
        }
       
    }
    componentDidMount() {
        this.getData()

    }



    async getData() {
        const res = await fetch('https://favouriteapp.herokuapp.com/item/favItems');
        const data = await res.json();

        console.log("sssssssssss", data.document)

        this.setState({
            items: data.document
        })
    }

    editFav(item) {
        let data = {
            itemId:item._id,
            favourite: false

        }
        
         axios.post('https://favouriteapp.herokuapp.com/item/editFav' , data).then((res) => {
           console.log("ccccccccccc" , res)
           this.getData()
          }).catch((error)=>{
              console.log("errorrrrrrr" , error)
          })
    }

    render() {
        return (
            <div className="container">
                <Head>
                    <title>Favourites</title>
                </Head>

                <main>
                    <h1 className="title">
                        Favourites
                </h1>
                    <Nav />


                    <div className="grid">
                        {
                            this.state.items ?
                            this.state.items.map(data => (
                                // <a className="card">
                                //     <h3>{data.title} &rarr;</h3>
                                //     <p>{data.name}</p>

                                // </a>
                                <div className="card" style={{ width: 500, height: 150 }}>
                                    <h3>{data.title}</h3>
                                    <p>{data.name}</p>
                                    <button onClick={() => {
                                        this.editFav(data)
                                    }}>
                                        Remove From Favourites
                                    </button>
                                </div>

                            )) :
                            <h3>No Favourites</h3>
                        }
                    </div>
                </main>

                <style jsx>{`
                .container {
                  min-height: 100vh;
                  padding: 0 0.5rem;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                }
                .fa {
                    font-size: 50px;
                    cursor: pointer;
                    user-select: none;
                  }
                  
                  .fa:hover {
                    color: darkblue;
                  }
        
                main {
                  padding: 5rem 0;
                  flex: 1;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                }
        
                footer {
                  width: 100%;
                  height: 100px;
                  border-top: 1px solid #eaeaea;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
        
                footer img {
                  margin-left: 0.5rem;
                }
        
                footer a {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
        
                a {
                  color: inherit;
                  text-decoration: none;
                }
        
                .title a {
                  color: #0070f3;
                  text-decoration: none;
                }
        
                .title a:hover,
                .title a:focus,
                .title a:active {
                  text-decoration: underline;
                }
        
                .title {
                  margin: 0;
                  line-height: 1.15;
                  font-size: 4rem;
                }
        
                .title,
                .description {
                  text-align: center;
                }
        
                .description {
                  line-height: 1.5;
                  font-size: 1.5rem;
                }
        
                code {
                  background: #fafafa;
                  border-radius: 5px;
                  padding: 0.75rem;
                  font-size: 1.1rem;
                  font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
                    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
                }
        
                .grid {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-wrap: wrap;
        
                  max-width: 800px;
                  margin-top: 3rem;
                }
        
                .card {
                  margin: 1rem;
                  flex-basis: 45%;
                  padding: 1.5rem;
                  text-align: left;
                  color: inherit;
                  text-decoration: none;
                  border: 1px solid #eaeaea;
                  border-radius: 10px;
                  transition: color 0.15s ease, border-color 0.15s ease;
                }
        
                .card:hover,
                .card:focus,
                .card:active {
                  color: #0070f3;
                  border-color: #0070f3;
                }
        
                .card h3 {
                  margin: 0 0 1rem 0;
                  font-size: 1.5rem;
                }
        
                .card p {
                  margin: 0;
                  font-size: 1.25rem;
                  line-height: 1.5;
                }
        
                .logo {
                  height: 1em;
                }
        
                @media (max-width: 600px) {
                  .grid {
                    width: 100%;
                    flex-direction: column;
                  }
                }
              `}</style>

                <style jsx global>{`
                html,
                body {
                  padding: 0;
                  margin: 0;
                  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                    sans-serif;
                }
        
                * {
                  box-sizing: border-box;
                }
              `}</style>
            </div>
        )
    }

}

export default Favo;
