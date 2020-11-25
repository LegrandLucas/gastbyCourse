import { useStaticQuery, graphql, Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    .active {
      background: var(--yellow);
    }
  }
`;

function countPizzasInToppings(pizzas) {
  const counts = pizzas
  .map((pizza) => pizza.toppings)
  .flat()
  .reduce((acc, topping) => {
    const existingTopping = acc[topping.id];
    if (existingTopping) {
      existingTopping.count += 1;
    } else {
      acc[topping.id] = {
        id: topping.id,
        name: topping.name,
        count: 1
      }
    };
    return acc
  }, {});
  const sortedToppings = Object.values(counts).sort((a, b) => b.coint - a.count);
  return sortedToppings
}


export default function ToppingsFilter() {
  const { toppings, pizzas } = useStaticQuery(graphql`
    query {
      toppings: allSanityTopping {
        nodes {
          id
          name
          vegetarian
        }
      }
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
`);

const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);
  return (
    <ToppingsStyles>
      {toppingsWithCounts.map((topping) => (
      <Link to={`/toppings/${topping.name}`} key={topping.id}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
      </Link>
      ))}
    </ToppingsStyles>
  );
}
