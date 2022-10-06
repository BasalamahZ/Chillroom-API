import axios from "axios";

export const games = async (req, res) => {
  axios({
    url: "https://api.igdb.com/v4/games",
    method: "POST",
    headers: {
      Accept: "application/x-www-form-urlencoded",
      "Client-ID": "1kyz1jn30o32r8cm613c2cc76kiblu",
      Authorization: "Bearer x4ofa8kzsazzilq9o2hufcwucobjuh",
    },
    data: "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;",
  })
    .then(response => {
      res.json(response.data);
    })
    .catch(err => {
      console.error(err);
    });
};

// import axios from "axios";

// axios.defaults.baseURL = "https://api.rawg.io/api";
// axios.defaults.params = { "key": process.env.GAME_API_KEY };

// export const games = async (req, res) => {
//   try {
//     const response = await axios.get("/games");
//     res.json(response.data.results[0]);
//   } catch (err) {
//     res.send(err);
//   }
// };
