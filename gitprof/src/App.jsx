import { useState } from "react";
import axios from "axios";

export default function App() {
  const [country, setCountry] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCountry = async () => {
    if (!country) return;

    try {
      setLoading(true);

      const res = await axios.get(
        `https://restcountries.com/v3.1/name/${country}`
      );

      setData(res.data[0]);
    } catch (error) {
      alert("Country not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-[#111827] px-6 py-10">

      {/* Navbar */}
      <nav className="max-w-7xl mx-auto h-20 bg-white border border-gray-200 rounded-2xl px-8 flex items-center justify-between shadow-sm mb-8">

        <div className="flex items-center gap-10">
          <h1 className="text-3xl font-bold text-blue-600">
            GlobeIQ
          </h1>

          <div className="flex gap-8 text-gray-600 font-medium">





          </div>
        </div>

        <div className="w-11 h-11 rounded-xl bg-[#d7f0ef]"></div>
      </nav>

      <div className="max-w-7xl mx-auto">

        {/* Search Section */}
        <div className="bg-white border border-gray-200 rounded-3xl p-12 shadow-sm mb-8">

          <h2 className="text-5xl font-bold text-center mb-5 tracking-tight">
            Global Intelligence Explorer
          </h2>

          <p className="text-center text-gray-500 text-lg mb-10 max-w-3xl mx-auto leading-8">
            Access verified demographic, economic, and geographic
            data with analytical precision through real-time
            country intelligence infrastructure.
          </p>

          <div className="flex gap-4 max-w-3xl mx-auto">
            <input
              type="text"
              placeholder="Search any country..."
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="flex-1 h-16 px-6 rounded-2xl border border-gray-300 outline-none text-lg bg-[#fafafa] focus:border-blue-500 transition"
            />

            <button
              onClick={fetchCountry}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-2xl font-semibold transition"
            >
              Search
            </button>
          </div>
        </div>

        {loading && (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
            <p className="text-xl text-gray-500">
              Fetching global intelligence...
            </p>
          </div>
        )}

        {data && (
          <>
            {/* Main Country Card */}
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-2 mb-8">

              <img
                src={data.flags.png}
                alt="flag"
                className="w-full h-full object-cover min-h-[400px]"
              />

              <div className="p-10 flex flex-col justify-center">

                <div className="flex gap-3 mb-5">
                  <span className="bg-blue-100 text-blue-700 text-sm px-4 py-2 rounded-xl font-semibold">
                    {data.region}
                  </span>

                  <span className="bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-xl font-medium">
                    {data.cca3}
                  </span>
                </div>

                <h2 className="text-6xl font-bold mb-6 tracking-tight">
                  {data.name.common}
                </h2>

                <p className="text-gray-600 text-lg leading-9">
                  {data.name.common} is a globally recognized nation
                  located within the {data.region} region. This dashboard
                  presents real-time demographic and geopolitical
                  intelligence sourced from international datasets.
                </p>

                <a
                  href={data.maps.googleMaps}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 bg-blue-600 hover:bg-blue-700 text-white w-fit px-8 py-4 rounded-2xl font-semibold transition"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

              <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                <p className="text-blue-600 font-semibold mb-6 tracking-wide">
                  POPULATION
                </p>

                <h2 className="text-5xl font-bold mb-3 tracking-tight">
                  {data.population.toLocaleString()}
                </h2>

                <p className="text-gray-500">
                  Current estimated national population.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                <p className="text-blue-600 font-semibold mb-6 tracking-wide">
                  CAPITAL
                </p>

                <h2 className="text-5xl font-bold mb-3 tracking-tight">
                  {data.capital?.[0]}
                </h2>

                <p className="text-gray-500">
                  Administrative and economic center.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                <p className="text-blue-600 font-semibold mb-6 tracking-wide">
                  CURRENCY
                </p>

                <h2 className="text-4xl font-bold mb-3 tracking-tight">
                  {Object.values(data.currencies || {})[0]?.name}
                </h2>

                <p className="text-gray-500">
                  Officially recognized monetary unit.
                </p>
              </div>
            </div>

            {/* Geographic Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-sm">

                <h2 className="text-4xl font-bold mb-10 tracking-tight">
                  Geographic Context
                </h2>

                <div className="grid grid-cols-2 gap-10">

                  <div>
                    <p className="text-gray-400 text-sm mb-2 tracking-wide">
                      REGION
                    </p>

                    <h3 className="text-3xl font-semibold">
                      {data.region}
                    </h3>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm mb-2 tracking-wide">
                      SUB-REGION
                    </p>

                    <h3 className="text-3xl font-semibold">
                      {data.subregion}
                    </h3>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm mb-2 tracking-wide">
                      LANGUAGES
                    </p>

                    <h3 className="text-2xl font-semibold leading-10">
                      {Object.values(data.languages || {}).join(", ")}
                    </h3>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm mb-2 tracking-wide">
                      COUNTRY CODE
                    </p>

                    <h3 className="text-3xl font-semibold">
                      {data.cca2}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="bg-blue-600 text-white rounded-3xl p-10 shadow-sm flex flex-col justify-center">

                <h2 className="text-5xl font-bold mb-6 tracking-tight">
                  Global Insight
                </h2>

                <p className="text-blue-100 text-lg leading-9">
                  {data.name.common} currently operates within the{" "}
                  {data.region} geopolitical region and maintains
                  international economic and cultural significance
                  through its demographic, linguistic, and strategic
                  infrastructure.
                </p>


              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}