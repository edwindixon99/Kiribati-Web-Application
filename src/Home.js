import WordPage from './WordPage'
import PageCard from './PageCard'
import RecentWordsAdded from './RecentWordsAdded'
function Home() {

    return <div className="container">
        
        <h1>Welcome to Kiribati Translate</h1>
        {/* <WordPage lang="kiribati" word="mau"/> */}
        <div className="container">
            <div className="row">
                <PageCard title="Kiribati" eDesc="Translate Kiribati words and some phrases to English" url="/kiribati" />
                <PageCard title="English" eDesc="Translate English words and some phrases to Kiribati" url="/english" />
                <PageCard title="Recent" eDesc="See recently added translations" url="/recent" />
 
        {/* <PageCard title="Add Translations" eDesc="Contribute to the dictionary by adding translations" url="/" /> */}
        </div>
        </div>
        {/* <RecentWordsAdded /> */}
    </div>
}

export default Home;