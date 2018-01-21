#!/usr/bin/env ruby
#encoding=utf-8
require 'erb'
require 'yaml'
require 'ruby-pinyin'
$src_dir = "tools/export_user_doc/docs"
$template_file = "tools/export_user_doc/template.erb"
$type_file = "tools/export_user_doc/types.yaml"
$index_file = "map/locations/index.yaml"
$desc_dir = "map/locations/descriptions"
$planet   = 'yipolis'

$template = ERB.new File.read $template_file

indices = YAML.load_file $index_file

Dir[$src_dir+"/*.ymd"].each do |f|
  meta, desc = YAML.load_stream File.open(f, "r:bom|utf-8"){|f| f.read}
  next if $planet != meta['planet']
  alt = indices.detect{|x| x['name'] == meta['title']}
  next if !alt.nil? && !alt['version'].nil? && alt['version'] > meta['version']
  indices.delete alt
  desc_file  = $desc_dir + "/" + PinYin.of_string(meta['title'], true).join("_") +".md"
  @desc = desc
  @authors = meta['authors']
  File.write desc_file, $template.result
  indices.push(
    'name' => meta['title'],
    'pos' => (meta['pos'].nil? ? alt['pos'] : ({
      'lat' => -meta['pos']['lat'],
      'lng' =>  meta['pos']['lng']
    })),
    'desc' => desc_file,
    'template' => meta['type'],
    'version' => meta['version']
  )
end

File.write $index_file, indices.to_yaml
