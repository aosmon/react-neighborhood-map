import React, {Component} from 'react'

class ListVenues extends Component {

	state = {
		query: ''
	}

	updateQuery = (query) => {
		this.setState(()=>({
			query: query.trim()
		}))
	}

	clearQuery = () => {
		this.updateQuery('')
	}

	render(){
		const { query } = this.state
		const { venues} = this.props

		const showingVenues = query === ''
			? venues
			: venues.filter((v) => (
				v.name.toLowerCase().includes(query.toLowerCase())
			))

		return (
			<div>
				<div className='list-venues-top'>
					<input className='search-values'
						type='text'
						placeholder='Search Venues'
						value={query}
						onChange={(event)=> this.updateQuery(event.target.value)}
					/>
				</div>

				{showingVenues.length !== venues.length && (
					<div className='showing-venues'>
						<span>Now showing {showingVenues.length} of {venues.length}</span>
						<button onClick={this.clearQuery}> Show all </button>
					</div>
				)}

				<ul className="venues-list">
					{showingVenues.map((venue)=>(
						<li key='venue.id' className='venue-list-item'>
							{venue.name}
						</li>
					))}
				</ul>
			</div>
		)
	}
}

export default ListVenues