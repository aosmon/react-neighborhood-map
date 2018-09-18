import React, {Component} from 'react'

class ListVenues extends Component {

	selectVenue = (e, name)=>{
		const {markers} = this.props
		let selected = markers.filter((m)=>m.title===name);
		let options = document.querySelectorAll('[aria-selected="true"]');
		options.forEach(function(o){o.setAttribute('aria-selected', 'false');})
		e.target.setAttribute('aria-selected', 'true');
		window.google.maps.event.trigger(selected[0], 'click');
	}

	render(){

		const {venues, query, sidebarVisible} = this.props

	    const showingVenues = query === ''
	      ? venues
	      : venues.filter((v) => (
	        v.name.toLowerCase().includes(query.toLowerCase())
	    ))  

		return (
			<div>
				<ul className="venues-list" role="listbox" tabIndex="0" aria-label="List of venues">
					{showingVenues.map((venue)=>(
						<li key={venue.name} 
							className='venue-list-item' 
							onClick={(e)=>this.selectVenue(e, venue.name)}
							tabIndex={sidebarVisible ? "0" : "-1"}
							role="option"
							aria-selected="false">
							{venue.name}
						</li>
					))}
				</ul>
			</div>
		)
	}
}

export default ListVenues