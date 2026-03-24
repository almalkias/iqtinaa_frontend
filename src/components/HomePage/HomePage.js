import Landing from "../Landing/Landing";
import Advantages from "../Advantages/Advantages";
// import BestSeller from "../BestSeller/BestSeller";
// import CustomerEvaluation from "../CustomerEvaluation/CustomerEvaluation";
import Subscribe from "../Subscribe/Subscribe";


function HomePage() {
    return (
        <div>
            <Landing />
            <Advantages />
            {/* <BestSeller /> */}
            {/* <CustomerEvaluation /> */}
            <Subscribe />
        </div>
    )
}

export default HomePage;