#!/usr/bin/env ruby
#encoding=utf-8
require 'yaml'
data = Dir['icons/*.svg'].map do |f|
  [File.basename(f, '.svg'), { 
    "icon" => {
      "path" => "map/locations/icons/#{File.basename f}",
      "width" =>  30,
      "height" => 30,
      "offset" => {
        "x" => -15,
        "y" => -30
      }
    },
    "label" => {
      "width" => 80
    }
  }]
end

File.write 'pins.yaml', data.to_h.to_yaml