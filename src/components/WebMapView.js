import React from "react";
import { loadModules } from "esri-loader";
import SideBar from "../components/SideBar";
import genObs from "../api/genobsApi";



export class WebMapView extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    console.log(this.ref);
  }

  componentDidMount() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    const options = { version: "3.3" };

    loadModules(
      [
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/ImageryLayer",
        "esri/layers/WMSLayer",
        "esri/geometry/Extent",
        "esri/geometry/SpatialReference",
        "dojo/domReady!",
        "esri/Map",
        "esri/layers/WMSLayer",
        "esri/geometry/Extent",
        "dojo/_base/array",
        "dojo/dom",
        "dojo/dom-construct",
        "dojo/parser",
        "dijit/layout/BorderContainer",
        "dijit/layout/ContentPane",
        "dojo/domReady!",
        "esri/layers/support/WMSSublayer",
        "esri/Basemap"
      ],
      { css: true },
      options
    ).then(
      ([
        ArcGISMap,
        MapView,
        ImageryLayer,
        WMSLayer,
        Extent,
        WMSSublayer,
        Basemap,
        Map
      ]) => {
        var layer2 = new ImageryLayer({
          url:
            "https://sampleserver6.arcgisonline.com/arcgis/rest/services/NLCDLandCover2001/ImageServer",
          format: "jpgpng" // server exports in either jpg or png format
        });

        // var layer = new  WMSLayer({
        //   url: "/wms?SERVICE=WMS&REQUEST=GetMap&TRANSPARENT=TRUE&FORMAT=image/png&STYLES=&VERSION=1.3.0&LAYERS=generalized_observations&WIDTH=1213&HEIGHT=977&CRS=EPSG:102100&BBOX=-12622967.122271439,4714540.033868581,-11139477.277313134,5909403.66002214&cql_filter=taxon_id%3D%273754%27&crs=EPSG%3A3857", // url to the service,
        //   //imageFormat: "image/png",
        //   extent: new Extent(-12622967.122271439,4714540.033868581, -11139477.277313134, 5909403.66002214, {
        //     wkid: 3857
        //   }),
        // });

        // var layer = new WMSLayer({
        //   url:
        //     "http://localhost:3001/wms?SERVICE=WMS&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=TRUE&STYLES=&VERSION=1.3.0&LAYERS=generalized_observations,generalized_distribution_models&WIDTH=1213&HEIGHT=977&BBOX=-12620287.761277478,4667834.219005647,-11136797.916319173,5862697.845159206&cql_filter=taxon_id%3D%273699%27%3Btaxon_id%3D%273699%27%20AND%20model_mean%20%3E%200&crs=EPSG%3A3857",
        //   // url to the service,
        //   extent: new Extent(
        //     -12622967.122271439,
        //     4714540.033868581,
        //     -11139477.277313134,
        //     5909403.66002214,
        //     {
        //       wkid: 3857
        //     }
        //   )
        // });

        var layerNew = new WMSLayer({
          id: "testLayer",
          url: "/wms",
          customParameters: {
            SERVICE: "WMS",
            FORMAT: "image/png",
            TRANSPARENT: "TRUE",
            STYLES: '',
            REQUEST: "GetMap",
            LAYERS: "generalized_observations",
            cql_filter: "taxon_id='3696'",
            WIDTH: "977",
            HEIGHT: "1213",
            BBOX: "-12620287.761277478,4667834.219005647,-11136797.916319173,5862697.845159206",
            crs: "EPSG:3857"
          },
          imageFormat: "image/png",
          fullExtents: "-12620287.761277478,4667834.219005647,-11136797.916319173,5862697.845159206",
          imageMaxHeight: "977",
          imageMaxWidth: "1213",
          imageTransparency: true,
          version: "1.3.0",
          spatialReferences: [3857,3857,3857],
          featureInfoUrl:"https://dev.wyndd.org/geoserver/wms",
          listMode: "show",
          visible: true,
          sublayers: {
          name: 'generalized_observations'
          }
        })

        // var layerRoads = new WMSLayer({
        //   url: "https://ows.terrestris.de/osm/service",
        //   sublayers: [
        //     {
        //       name: "OSM-WMS"
        //     }
        //   ]
        // });

        // console.log(layer);

        const map = new Map({
          //basemap: "topo",
          extent: new Extent({xmin:-8.64846,ymin:49.8638,xmax:1.76767,ymax:60.8612,spatialReference:{wkid:3857}}), 
          basemap: {
            baseLayers: [layerNew],
          }
          //layers: [layer2]
        });

        this.view = new MapView({
          container: this.mapRef.current,
          map: map,
          spatialReference: [3857, 3857, 3857]
          // center: [-107, 43],
          // zoom: 7  ,
        });
      }
    );
    console.log(this.mapRef);
  }

  componentWillUnmount() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }

  render() {
    return (
      <div className="ui container" style={{ width: "100%" }}>
        <div className="ui grid">
          <div className="four wide column">
            <SideBar />
          </div>
          <div className="twelve wide column">
            <div
              className="webmap"
              ref={this.mapRef}
              style={{ height: "100vh" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}
