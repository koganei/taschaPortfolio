<?php

namespace Tasch\ApiBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('TaschApiBundle:Default:index.html.twig', array('name' => $name));
    }

    public function dictionaryAction($word) {
        $key = "5a832bd8-075c-4348-aa61-fea55d3d88ea";
        $url =  "http://www.dictionaryapi.com/api/v1/references/collegiate/xml/" . 
                    urlencode($word) . "?key=" . urlencode($key);
        $contents = file_get_contents($url);
        $xml = simplexml_load_string($contents);
        $json = json_encode($xml);
        return new JsonResponse($xml);
    }   

    public function wikipediaAction($word) {

        $url =  "http://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts|info&exintro&titles=" . 
                    urlencode($word);
        $contents = file_get_contents($url);
        return new JsonResponse(array('contents', $contents));
    }
}
