let store = {
    debug: true,
    state: {
        postList: [],
        location: {}
    },
    setPostAction(post) {
        this.state.postList.push(post);
    },
    setLocationAction(locationObj) {
        this.state.location = locationObj;
    }
};

export default store;