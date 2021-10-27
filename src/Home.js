import WordPage from './WordPage'
import PageCard from './PageCard'
import RecentWordsAdded from './RecentWordsAdded'
import Authentication from './Authentication'
function Home() {

    return <div className="container">
        
        <h1>Welcome to Kiribati Translate</h1>
        {/* <WordPage lang="kiribati" word="mau"/> */}
        <div className="container">
            <div className="row">
                <Authentication />
                <PageCard title="Kiribati" eDesc="Translate Kiribati words and some phrases to English" kDesc="Raira taeka ni Kiribati nakon taetae ni Imatang" url="/kiribati" />
                <PageCard title="English" eDesc="Translate English words and some phrases to Kiribati" kDesc="Raira taeka ni Imatang nakon taetae ni Kiribati" url="/english" />
                <PageCard title="Recent" eDesc="See recently added translations" url="/recent" />
        </div>
        </div>
    </div>
}

export default Home;