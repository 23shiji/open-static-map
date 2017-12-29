#!/usr/bin/env ruby
#encoding=utf-8
require 'nokogiri'
require 'victor'

def mergesvg(ic, bg, s)
  icdoc = Nokogiri::XML.parse File.read ic
  bgdoc = Nokogiri::XML.parse File.read bg
  root = icdoc.at('svg')
  vw = 200
  vh = 200
  cx = 42
  cy = 42
  ofx = 15
  ofy = 10
  icw = 50
  oicw = root[:width].to_f
  oich = root[:height].to_f
  ich = oich * icw / oicw
  zoom = [icw/oicw, ich/oich].min
  color = "#58B2DC"
  svg = Victor::SVG.new width: vw, height: vh, viewBox: "0 0 82.93 100"
  svg.build do
    bgdoc.css('path').each do |pt|
      path d: pt[:d], fill: color
    end
    bgdoc.css('polygon').each do |pt|
      polygon points: pt[:points], fill: color
    end
    icdoc.css('path').each do |pt|
      tr = "translate(#{cx - (oicw/2)*zoom}, #{cy - (oich/2)*zoom}) scale(#{zoom})"
      path transform: tr, d: pt[:d], fill: "#FFFFFF", 'transform-origin' => "0 0"
    end
  end
  svg.save s
end

Dir['svg/*.svg'].each do |f|
  title = File.basename(f, '.svg').gsub('-','_')
  mergesvg f, 'bg.svg', "icons/#{title}.svg"
end