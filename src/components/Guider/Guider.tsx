import { useQuery, gql } from '@apollo/client';
import Title from '../Title';
import Diagram from './Diagram';
import './Guider.scss';

const GET_CHARACTER = gql`
  query getCharacters($page: Int){
    characters(page: $page) {
      info {
        count,
        pages,
        next,
        prev
      },
      results {
        id,
        name,
        species,
        type,
        gender,
        image
      }
    }
  }
`

function RickAndMorty() {
  const { loading, error, data, refetch } = useQuery(GET_CHARACTER, {
    variables: {
      page: 1
    },
    context: {
      clientName: "rickAndMorty"
    }
  });
  if (loading) return <p>Loading...</p>
  if (error) { 
    console.log(error)
    return <p>Error : {error.message}</p>
  }

  return (
    <div className="characters">
      {data.characters.results.map(({ id, name, species, type, gender, image }: { id: number, name: string, species: string, type: string, gender: string, image: string}) => (
        <div key={id} className="character">
          <img alt="character-image" src={`${image}`} />
          <div className="description">
            <span>{name}</span>
            <span>{`${species}${Boolean(type) ? ` - ${type}` : ""}`}</span>
            <span>{gender}</span>
          </div>
        </div>
      ))}
      <button onClick={() => refetch({page: data.characters.info.prev})}>prev</button>
      <button onClick={() => refetch({page: data.characters.info.next})}>next</button>
    </div>
  )
}

export default function Guider({ prevPanel, nextPanel }: { prevPanel: () => void, nextPanel: () => void }) {
  return (
    <div className="guider">
      <Title title="Guider" prevPanel={prevPanel} nextPanel={nextPanel}></Title>
      <Diagram />
      <RickAndMorty />
    </div>
  );
}