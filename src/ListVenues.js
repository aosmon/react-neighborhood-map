import React, {Component} from 'react'

class ListVenues extends Component {


	render(){

		const {venues, query} = this.props

	    const showingVenues = query === ''
	      ? venues
	      : venues.filter((v) => (
	        v.name.toLowerCase().includes(query.toLowerCase())
	    ))  

		return (
			<div>
				<ul className="venues-list">
					{showingVenues.map((venue)=>(
						<li key={venue.name} className='venue-list-item'>
							{venue.name}
						</li>
					))}
				</ul>
			</div>
		)
	}
}

export default ListVenues