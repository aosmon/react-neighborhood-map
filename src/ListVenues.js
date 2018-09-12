import React, {Component} from 'react'

class ListVenues extends Component {

	selectVenue = (name)=>{

		const {venues, query, markers} = this.props
		let selected = markers.filter((m)=>m.title===name);
		//console.log(markers);
		window.google.maps.event.trigger(selected[0], 'click');
	}

	render(){

		const {venues, query, markers} = this.props

	    const showingVenues = query === ''
	      ? venues
	      : venues.filter((v) => (
	        v.name.toLowerCase().includes(query.toLowerCase())
	    ))  

		return (
			<div>
				<ul className="venues-list">
					{showingVenues.map((venue)=>(
						<li key={venue.name} className='venue-list-item' onClick={()=>this.selectVenue(venue.name)}>
							{venue.name}
						</li>
					))}
				</ul>
			</div>
		)
	}
}

export default ListVenues