import React, { Fragment } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import Error404 from './pages/Error404';
import ProjectDetail from './pages/ProjectDetail';
import Header from './components/Header';

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                clients: {
                    merge(existing, incoming) {
                        return incoming
                    }
                },
                projects: {
                    merge(existing, incoming) {
                        return incoming
                    }
                }
            }
        }
    }
});

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: cache
});

const App = () => {
    return (
        <Fragment>
            <ApolloProvider client={client}>
                <Router>
                    <Header />
                    <div className="container">
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/projects/:id' element={<ProjectDetail />} />
                            <Route path='*' element={<Error404 />} />
                        </Routes>
                    </div>
                </Router>
            </ApolloProvider>
        </Fragment>
    )
};

export default App;