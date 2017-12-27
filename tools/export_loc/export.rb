#!/usr/bin/env ruby
#encoding=utf-8
require 'yaml'
require 'nokogiri'
doc = Nokogiri::XML.parse File.read 'base.svg'
items = doc.css('g#实景图 g').reject{|x| x[:id].nil?}
data = items.map do |it|
  sx = 0
  sy = 0
  n = it.css('rect, circle, polygon').length
  it.css('rect').each do |r|
    sx += r[:x].to_f + r[:width].to_f / 2
    sy += r[:y].to_f + r[:height].to_f / 2
  end
  it.css('circle').each do |r|
    sx += r[:cx].to_f
    sy += r[:cy].to_f
  end
  it.css('polygon').each do |p|
    points = p[:points].split.map{|x| x.split(',').map(&:to_f)}
    sx += points.map(&:first).reduce(&:+) / points.length
    sy += points.map(&:last).reduce(&:+) / points.length
  end
  next nil if n == 0
  x = sx / n
  y = sy / n
  lng = x * 360 / 6243 - 180
  lat = y * 180 / 3121 - 90
  puts "#{it[:id]} #{[x, y]} #{[lng, lat]}"
  {
    'name' => it[:id],
    'template' => 'unknown',
    'pos' => {
      'lng' => lng,
      'lat' =>  lat
    }
  }
end.reject(&:nil?)

File.write 'export.yaml', {'location' => data}.to_yaml