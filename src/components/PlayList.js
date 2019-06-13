import React from 'react';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import VideIcon from '@material-ui/icons/PlayCircleOutline';
import ReactTooltip from 'react-tooltip';

const deleteItem = (id, videos, setVideos) => {
	const newList = videos.filter((item, index) => index !== id);
	localStorage.setItem('videos', newList);
	setVideos(newList);
};

export default function PlayList({ videos, currentVideo, setCurrentVideo, setVideos }) {
	return (
		<>
			<h4>Playlists {videos.length !== 0 ? <div className="playlist-count">{videos.length}</div> : ''}</h4>
			<ul>
				{videos.length === 0 ? <span className="text-muted">No video's in the Playlist</span> : ''}
				{videos.map((video, index) => (
					<li key={video} className={currentVideo === video ? 'active' : ''}>
						<div onClick={() => setCurrentVideo(video)} href="#" className="d-flex pl-5 nav-video">
							<VideIcon fontSize="small" />
							<div>
								<span>Video {index + 1}</span>
							</div>
						</div>
						<span className="delete" data-tip="Remove Video">
							<ReactTooltip effect="solid" place="right" />
							<DeleteIcon
								onClick={e => {
									deleteItem(index, videos, setVideos);
								}}
							/>
						</span>
					</li>
				))}
			</ul>
		</>
	);
}
