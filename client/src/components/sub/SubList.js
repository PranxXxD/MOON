import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubs } from "../../functions/sub";
import "./Sublist.css";

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs().then((s) => {
      setSubs(s.data);
      setLoading(false);
    });
  }, []);

  const showSubs = () =>
    subs.map((s) => (
      <div
        className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
        key={s._id}
      >
        <Link className="sublist__Category" to={`/sub/${s.slug}`}> {s.name}</Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? <h4 className="text-center">Loading...</h4> : showSubs()}
      </div>
    </div>
  );
};
export default SubList;
