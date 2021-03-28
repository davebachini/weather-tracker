
const SearchForm = ({onSearch}) => {
    
    return (
        <form onSubmit={onSearch}>
            <div className="row justify-content-center">
                <div className="col-md-3 offset-md-2">
                    <input className="form-control" name="city" placeholder="Enter city" type="text" />
                    <label>e.g. Belleville</label>
                </div>
                <div className="col-md-3">
                    <input className="form-control" name="country" placeholder="Enter country code" type="text"/>
                    <label>e.g. CA</label>
                </div>
                <div className="col-md-3 mt-md-0 mt-2 text-md-left ">
                    <button className="btn btn-primary btn-md" type="submit">Search</button>
                </div>
            </div>
        </form>
    )
}

export default SearchForm;