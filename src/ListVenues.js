import React, {Component} from 'react'

class ListVenues extends Component {

	render(){
		return (
			<section className='venues-list-container'>
				<div className='list-venues-top'>

				</div>
				<ul className="venues-list">
					{this.props.venues.map((venue)=>(
						<li key='venue.id' className='venue-list-item'>
							{venue.name}
						</li>
					))}
				</ul>
			</section>
		)
	}
}

export default ListVenues