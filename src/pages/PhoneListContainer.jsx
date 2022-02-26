import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

export const PhoneListContainer = () => {
  const [phones, setPhones] = useState([]);
  const [sortBrand, setSortBrand] = useState([]);
  const [sortPrice, setSortPrice] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3005/phones/")
      .then((response) => {
        setPhones(response.data);
        setTimeout(() => {}, 2000);
        setLoading(false);
      })
      .catch(console.log);
  }, []);

  //const copyPhones = [...phones]

  const sortByBrand = () => {
    phones.sort((a, b) => {
      return a.brand < b.brand ? -1 : 1;
    });
    setSortBrand(phones);
  };

  const sortByPrice = () => {
    phones.sort((a, b) => {
      return a.price < b.price ? -1 : 1;
    });
    setSortPrice(phones);
  };

  return (
    <>
      <h1>Phone Catalog</h1>
      <button
        className="btn btn-primary"
        data-bs-toggle="button"
        autoComplete="off"
        onClick={sortByBrand}
      >
        Sort by Brand
      </button>
      <button
        className="btn btn-primary m-2"
        data-bs-toggle="button"
        onClick={sortByPrice}
      >
        Sort by Price
      </button>

      {loading === true ? <Loader /> : loading === false}
      {phones.map((phone) => {
        return (
          <div key={phone.id}>

          <div className="d-flex justify-content-center m-3 mx-auto">
          <div class="card col-sm-4 col-md-3 col-lg-3">
  <img className="card-img-top" src={phone.image_url} alt={phone.name} />
  <div class="card-body">
    <h5 class="card-title">{phone.name}</h5>
     <h6>Color: {phone.color}</h6>
    <p class="card-text">{phone.description}</p>
    <h4>Price: {phone.price}</h4>
    <Link to={`/phones/${phone.id}`}>Details</Link>
  </div>
</div>
</div>
         
          
            <hr></hr>
          </div>
        );
      })}
    </>
  );
};
