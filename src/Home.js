import WordPage from './WordPage'
import PageCard from './PageCard'
function Home() {

    return <div className="container">
        
        <h1>Welcome to Kiribati Translate</h1>
        {/* <WordPage lang="kiribati" word="mau"/> */}
        <div className="container">
            <div className="row">
            <div className="col-12 col-sm-6">
                <PageCard title="Kiribati" eDesc="Translate Kiribati words and some phrases to english" url="/kiribati" />
                </div>
                <div className="col-12 col-md-6">
                <PageCard title="English" eDesc="Translate English words and some phrases to Kiribati" url="/english" />
                </div>
        {/* <PageCard title="Add Translations" eDesc="Contribute to the dictionary by adding translations" url="/" /> */}
        </div>
        </div>

    </div>
}

export default Home;