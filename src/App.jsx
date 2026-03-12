import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";

function App(){
    return(
        <>
            <Nav />
            <Hero/>
            <About/>
            <Experience/>
            <Skills/>
            <Projects/>
            <Contacts/>
            <Footer/>
        </>
    );
}

export default App;