<?php

namespace Tasch\ApiBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations\View;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Tasch\ApiBundle\Entity\Poem;
use FOS\RestBundle\Request\ParamFetcher;
use FOS\RestBundle\Controller\Annotations\RequestParam;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\ConstraintViolation;

class PoemsController extends Controller
{

    /**
     * @return array
     * @View()
     */
    public function getPoemsAction()
    {
        $poems = $this->getDoctrine()->getRepository('TaschApiBundle:Poem')
            ->findAll();

        return array('poems' => $poems);
    }

    /**
     * @param  Poem   $poem
     * @return array
     * @View()
     * @ParamConverter("poem", class="TaschApiBundle:Poem")
     */
    public function getPoemAction(Poem $poem)
    {
        return array('poem', $poem);
    }

    /**
     * Creates a new Peom entity.
     * Using param_fetcher_listener: force (??)
     *
     * @param ParamFetcher $paramFetcher Paramfetcher
     *
     * @RequestParam(name="title", default="", description="Title.")
     * @RequestParam(name="body", default="", description="Body.")
     * @RequestParam(name="started", default="", description="Started.")
     * @RequestParam(name="updated", default="", description="Updated.")
     * @RequestParam(name="featured", default="", description="Featured.")
     * @RequestParam(name="coordinates", default="", description="Coordinates.")
     * @RequestParam(name="color", default="", description="color.")
     */
    public function postPoemsAction(ParamFetcher $paramFetcher)
    {
        $request = $this->getRequest();

        $poem = new Poem();
        
        $this->attachRequestToPoem($poem, $request);

        $em = $this->getDoctrine()->getManager();
        $em->persist($poem);
        $em->flush();

        return $this->forward('TaschApiBundle:Poems:getPoem', array(
            'poem'  => $poem
        ));
    }

    /**
     * Creates a new Peom entity.
     * Using param_fetcher_listener: force (??)
     *
     * @param ParamFetcher $paramFetcher Paramfetcher
     *
     * @RequestParam(name="title", default="", description="Title.")
     * @RequestParam(name="body", default="", description="Body.")
     * @RequestParam(name="started", default="", description="Started.")
     * @RequestParam(name="updated", default="", description="Updated.")
     * @RequestParam(name="featured", default="", description="Featured.")
     * @RequestParam(name="coordinates", default="", description="coordinates.")
     * @RequestParam(name="color", default="", description="color.")
     */
    public function putPoemsAction($slug)
    {
        $request = $this->getRequest();

        if($slug == null) {
            die('no slug');
        }

        $em = $this->getDoctrine()->getManager();
        $poem = $this->getDoctrine()->getRepository('TaschApiBundle:Poem')
        ->find($slug);

        $this->attachRequestToPoem($poem, $request);
        
        $em->persist($poem);
        $em->flush();

        return $this->forward('TaschApiBundle:Poems:getPoem', array(
            'poem'  => $poem
        ));
    }

    public function attachRequestToPoem(Poem $poem, Request $request) {
        $poem->setTitle($request->get('title'));
        $poem->setBody($request->get('body'));
        $poem->setBackground($request->get('background'));
        // $poem->setStarted($request->get('started'));
        // $poem->setUpdated($request->get('updated'));
        $poem->setFeatured($request->get('featured'));
        $poem->setCoordinates($request->get('coordinates'));
        $poem->setColor($request->get('color'));
    }
}
