import React, {Component} from 'react'

class ListVenues extends Component {

	//Select venue and trigger marker when clicked on the list item
	selectMarker = (name)=>{

		let {selectVenue} = this.props;

		const {markers} = this.props
		let selected = markers.filter((m)=>m.title===name);
		window.google.maps.event.trigger(selected[0], 'click');
		selectVenue(selected[0]);
	}

	render(){

		const {venues, query, sidebarVisible} = this.props

	    const showingVenues = query === ''
	      ? venues
	      : venues.filter((v) => (
	        v.name.toLowerCase().includes(query.toLowerCase())
	    ))  

		return (
			<section className='venues-list-container'>
				<ul className="venues-list" role="listbox" tabIndex="0" aria-label="List of venues">
					{showingVenues.map((venue)=>(
						<li key={venue.name} 
							id={venue.name}
							className='venue-list-item' 
							onClick={(e)=>this.selectMarker(venue.name)}
							tabIndex={sidebarVisible ? "0" : "-1"}
							role="option"
							aria-selected="false">
							{venue.name}
						</li>
					))}
				</ul>
			</section>
		)
	}
}

export default ListVenues