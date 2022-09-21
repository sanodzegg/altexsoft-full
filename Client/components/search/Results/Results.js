import ResultCard from './ResultCard/ResultCard';
import { useSelector } from 'react-redux';
import Loader from '../../loader/Loader';

const Results = () => {
  const myBookings = useSelector((state) => {
    return state.auth.profile?.myBookings;
  });

  const searchResults = useSelector((state) => state.search.results);

  const myID = useSelector((state) => {
    return state.auth.userID;
  });

  const bookedApartmentIds = myBookings?.map((apartment) => {
    return apartment.hostID;
  });

  return (
    <div className="row">
      {!searchResults.length > 0 && <Loader />}
      {searchResults?.map((result, i) => {
        return (
          <ResultCard
            key={i}
            apartment={result}
            isAvailable={
              result.isAvailable &&
              !bookedApartmentIds?.includes(result.hostId) &&
              result.hostId != myID
                ? true
                : false
            }
            hostID={result.hostId}
          />
        );
      })}
    </div>
  );
};

export default Results;
