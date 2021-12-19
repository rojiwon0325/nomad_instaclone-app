module.exports = {
    client: {
        includes: ["./constants/**/*.{tsx,ts}"],
        tagName: "gql",
        service: {
            name: "instaclone-backend",
            url: "http://rojiwon-nomad-instaclone.herokuapp.com/graphql",
        }
    },
};
