import React, { Component } from "react";

/*
    Ej de uso: <GoogleMap lat="-33.6576955" lng="-65.4579169" zoom="10" gwidth="100%" gheight="400px" />
*/

class GoogleMap extends Component {
    constructor(props) {
        super(props);   
        this.state = {
            loading: true,
            id: "ec94e128ca41ccaf",
            lat: 0,
            lng: 0,
            zoom: 13,
            gwidth: "100%",
            gheight: "100%",
            marker: null,
            maptype: "roadmap"
        }
        this.setMap = this.setMap.bind(this);
    }

    setMap(id) {
        this.setState({
            id: id,
            lat: parseFloat(this.props.lat, 10),
            lng: parseFloat(this.props.lng, 10),
            zoom: parseInt(this.props.zoom, 10),
            gwidth: this.props.gwidth,
            gheight: this.props.gheight
        }, () => {
            let {lat, lng, zoom} = this.state;

            let map = new window.google.maps.Map(document.getElementById(this.state.id), {
                center: {lat: lat, lng: lng},
                zoom: zoom,
                mapTypeId: "roadmap",
            });

            map.addListener("zoom_changed", () => {
                this.setState({
                    zoom: map.getZoom(),
                });
            });

            map.addListener("maptypeid_changed", () => {
                this.setState({
                    maptype: map.getMapTypeId(),
                });
            });

            let marker = new window.google.maps.Marker({
                map: map,
                position: {lat: lat, lng: lng},
            });

            this.setState({
                marker: marker
            });

        });
    }

    componentDidUpdate(prevProps) {
        if(this.props.lat !== prevProps.lat || this.props.lng !== prevProps.lng) {
            this.setMap();
        }
    }

    componentDidMount() {
        this.setState({
            id: "map-" + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
        }, () => {
            this.setMap(this.state.id);
        })
    }

    render() {
        return(
            <React.Fragment>
                <div id={`${this.state.id}`} className="gmapa" />
                
                <style jsx="true">{`
                    .gmapa {
                        width: ${this.state.gwidth};
                        height: ${this.state.gheight};
                    }
                `}</style>
            </React.Fragment>
        );
    }
}

export default GoogleMap;


/*
    import React, { Component } from "react";
    
class GoogleMap extends Component {
    constructor(props) {
        super(props);   
        this.state = {
            loading: true,
            id: "ec94e128ca41ccaf",
            lat: 0,
            lng: 0,
            zoom: 13,
            gwidth: "100%",
            gheight: "100%",
            marker: null,
            maptype: "roadmap"
        }
        this.setMap = this.setMap.bind(this);
        this.initMap = this.initMap.bind(this);
    }


    initMap(id) {
        this.setState({
            id: id,
            lat: this.props.lat,
            lng: this.props.lng,
            zoom: parseInt(this.props.zoom, 10),
            gwidth: this.props.gwidth,
            gheight: this.props.gheight
        }, () => {
            let {lat, lng, zoom} = this.state;

            let x = -1;
            let locations = []

            lat.forEach(element => {
                x++;
                var lgn = lng[x]
                locations.push({element, lgn}) 
            });

            const map = new window.google.maps.Map(document.getElementById(this.state.id), {
                zoom: 3,
                zoom: zoom,
                mapTypeId: "roadmap",
                center: { lat: -28.024, lng: 140.887 },
            });
            
            const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            
            const markers = locations.map((location, i) => {
                return new window.google.maps.Marker({
                    map: map,
                    position: location,
                    label: labels[i % labels.length],
                });
            });
        })
        
    }

    setMap(id) {
        this.setState({
            id: id,
            lat: parseFloat(this.props.lat, 10),
            lng: parseFloat(this.props.lng, 10),
            zoom: parseInt(this.props.zoom, 10),
            gwidth: this.props.gwidth,
            gheight: this.props.gheight
        }, () => {
            let {lat, lng, zoom} = this.state;

            let map = new window.google.maps.Map(document.getElementById(this.state.id), {
                center: {lat: lat, lng: lng},
                zoom: zoom,
                mapTypeId: "roadmap",
            });

            map.addListener("zoom_changed", () => {
                this.setState({
                    zoom: map.getZoom(),
                });
            });

            map.addListener("maptypeid_changed", () => {
                this.setState({
                    maptype: map.getMapTypeId(),
                });
            });

            let marker = new window.google.maps.Marker({
                map: map,
                position: {lat: lat, lng: lng},
            });

            this.setState({
                marker: marker
            });

        });
    }

    componentDidUpdate(prevProps) {
        if(this.props.lat !== prevProps.lat || this.props.lng !== prevProps.lng) {
            this.setMap();
        }
    }

    componentDidMount() {
        this.setState({
            id: "map-" + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
        }, () => {
            if(Object.prototype.toString.call(this.props.lat) === '[object Array]'){
                console.log("entre aca")
                this.initMap(this.state.id); 
            }else{
                this.setMap(this.state.id);
            }
            
        })
    }

    render() {
        return(
            <React.Fragment>
                <div id={`${this.state.id}`} className="gmapa" />
                
                <style jsx="true">{`
                    .gmapa {
                        width: ${this.state.gwidth};
                        height: ${this.state.gheight};
                    }
                `}</style>
            </React.Fragment>
        );
    }
}

export default GoogleMap;
*/ 