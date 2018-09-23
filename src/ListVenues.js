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

	handleKeyDown = (e) => {
		e.preventDefault();
		var key = e.which || e.keyCode;
		switch(key){
			case 40:
				let next = e.target.nextElementSibling;
				if(next){
					next.focus();
				}
				break;
			case 38:
				let prev = e.target.previousElementSibling;
				if(prev){
					prev.focus();
				}
				break;
			case 13:
				this.selectMarker(e.target.id);
				break;
			default:
		}
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
							onKeyDown={(e)=>this.handleKeyDown(e)}
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