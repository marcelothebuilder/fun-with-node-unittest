class AbstractRepository {
    constructor(dataLoader) {
        this._dataLoader = dataLoader;
    }

    loader() {
        return this._dataLoader;
    }
}

module.exports = AbstractRepository;
