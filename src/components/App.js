import React, { useState } from 'react';
import useDarkMode from 'use-dark-mode';
import ReactTooltip from 'react-tooltip';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import ClearAllIcon from '@material-ui/icons/ClearAllOutlined';
import { validURL } from './helpers/validUrl';
import VideoPlayer from './VideoPlayer';
import Toolbar from './Toolbar';
import PlayList from './PlayList';

const handlePlaylist = (value, setVideos) => {
	const urls = value.replace(/(\r\n|\n|\r)/gm, '').split(',');
	let error = 0;
	urls.map(url => {
		if (!validURL(url.trim())) {
			error = 1;
		}
	});
	if (error === 0) {
		localStorage.setItem('videos', urls);
		setVideos(urls);
		return true;
	} else return false;
};

const videosInitialData = () => {
	// Load localstorage items to initial state
	const videosData = localStorage.videos;
	if (videosData) return videosData.split(',');
	return [];
};

function App() {
	const darkMode = useDarkMode(false);
	const [videos, setVideos] = useState(videosInitialData());
	const [currentVideo, setCurrentVideo] = useState(videos[0]);
	const [showListMode, setShowListMode] = useState(false);
	const [error, setError] = useState(false);

	const showList = () => {
		setShowListMode(!showListMode);
	};

	return (
		<div className="App d-flex">
			<div className="sidebar">
				<div className="right">
					<div data-tip="Add Playlist" className="round-button" onClick={() => showList()}>
						<ReactTooltip effect="solid" place="right" />
						<PlaylistAddIcon />
					</div>

					<div
						data-tip="Clear Playlist"
						className="round-button"
						onClick={() => {
							setVideos([]);
							localStorage.removeItem('videos');
						}}
					>
						<ReactTooltip effect="solid" place="right" />
						<ClearAllIcon fontSize="small" />
					</div>
				</div>
				{showListMode && (
					<form
						onSubmit={e => {
							e.preventDefault();
							if (handlePlaylist(e.target.playlisturls.value, setVideos)) {
								showList();
								setError();
							} else setError('URL List contains invalid URL');
						}}
						className="playlist-form"
					>
						{error && <div className="alert-error">{error}</div>}
						<textarea
							name="playlisturls"
							required
							placeholder="Add video's to playlist (separated by comma)"
						/>
						<button className="right button-primary">Save Playlist</button>
					</form>
				)}

				<PlayList
					videos={videos}
					currentVideo={currentVideo}
					setCurrentVideo={setCurrentVideo}
					setVideos={setVideos}
				/>

				<Toolbar toggle={darkMode.toggle} />
			</div>
			<div className="flex-grow-1 d-flex center">
				<div className="w-100">
					<VideoPlayer currentVideo={currentVideo} />
				</div>
			</div>
		</div>
	);
}

export default App;
